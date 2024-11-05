'use client'
import { Input } from '@/components/ui/input';     // Import Input component if needed
import { useState } from 'react';
import axios from "axios";
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Home() {
  const [file, setFile] = useState(null)
  const [pred, setPre] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()  
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/classify/', formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setPre(response.data);
    } catch(err) {
      console.error(err)
    }
  }

  return (
      <>
      <div style={{'borderRadius':'40px'}} className="m-4 ml-auto text-right p-4 w-fit text-3xl bg-green-100 italic">#1</div>
      <div className="text-center w-screen p-4 font-mono text-6xl underline decoration-green-500 underline-offset-8">Image Classifier</div>
      <div className="mt-12 w-screen p-4">
        <form onSubmit={handleSubmit} className="flex justify-center">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Input id="picture" accept="image/*" onChange={(e) => setFile(e.target.files[0])} className='bg-blue-100 hidden' type="file" />
            <label htmlFor="picture" className="cursor-pointer text-white flex flex-col mx-auto p-2 rounded">
            <FontAwesomeIcon icon={faFileUpload} className="text-green-500  w-40 h-40 mb-2" />
            
            {file ? (<p className="text-black underline text-center ">{file.name}</p>): ''}</label>
            <button className="block w-fit p-2 px-3 mx-auto bg-green-200" type="submit">Process</button>
           
          </div>
        </form>
      </div>
      <div className="w-screen p-4 lg:px-12 gap-2 grid grid-cols-3">
        {pred.map((items, index) => (
              <div key={index} className="p-4  border border-2 border-green-500 rounded-lg text-center">{items.description}</div>    
        ))}
      </div>
      <div className="absolute bottom-2 left-2 text-left w-fit">lorem epsum dolor</div>
      </>
     );
}
