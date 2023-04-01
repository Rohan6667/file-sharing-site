import RenderFile from "@components/RenderFile"
import axios from "axios"
import { GetServerSidePropsContext, NextPage } from "next"
import { IFile } from "../../../../libs/types"

const index:NextPage<{
  file: IFile
}> = ({file:{format,name,sizeInBytes,id}}) => {
  return (
    <div className="flex flex-col items-center justify-center py-3 px-4 bg-gray-800 rounded-md shadow-xl w-96">
      {!format ? <span>{`Sorry, this file doesn't exist :(`}</span> : <>
      
      <img src="/images/download-icon.jpeg" alt=""></img>
      <h1>Your file is ready to be downloaded.</h1>
      <RenderFile file={{format,name,sizeInBytes,id}}/>
      <button>Download</button>
      </>}
    </div>
  )
}

export default index;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {id} = context.query;
  let file;
  try {
    const {data} = await axios.get(`http://localhost:4000/api/files/${id}`)
    file = data
  } catch(error: any) {
    console.log(error.response.data)
    file = {}
  }

  return {
    props: {
      file,
    },
  }
} 