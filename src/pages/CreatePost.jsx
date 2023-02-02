import React, { useState } from 'react'
import Loader from '../components/Loader'
import FormField from '../components/FormField'
import Header from '../components/Header';
import { preview } from '../assets/index';
import { getRandomPrompt } from '../utils/index';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreatePost() {

  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', prompt: '', photo: '' })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alertErrorGenerateImage, setAlertErrorGenerateImage] = useState('')


  // Create Image
  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const response = await axios.post('https://dall-e-server.onrender.com/api/v1/dalle/generateImage',
          { prompt: form.prompt }
        )
        const data = await response.data
        // console.log('data', data);

        setForm({ ...form, photo: data.photo })
        // setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
        // console.log(data);
      } catch (error) {
        setAlertErrorGenerateImage('Oops! Something went wrong, Try again')
        setInterval(() => {
          setAlertErrorGenerateImage('')
        }, 2000);
      } finally {
        setAlertErrorGenerateImage('')
        setGeneratingImg(false)
      }
    }
    else {
      setAlertErrorGenerateImage('Please enter a prompt')
      setInterval(() => {
        setAlertErrorGenerateImage('')
      }, 2000);
    }
  }

  // Share Image
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.prompt && form.photo) {
      setLoading(true)
      try {

        const response = await axios.post('https://dall-e-server.onrender.com/api/v1/posts/create-post',
          { name: form.name, prompt: form.prompt, photo: form.photo }
        )
        // console.log('data', response);
        navigate('/')
      } catch (error) {
        setAlertErrorGenerateImage('Oops! Something went wrong, Try again')
        setInterval(() => {
          setAlertErrorGenerateImage('')
        }, 2000);
      } finally {
        setAlertErrorGenerateImage('')
        setGeneratingImg(false)
      }
    }
    else {
      setAlertErrorGenerateImage('Please enter a prompt/Generate an image')
      setInterval(() => {
        setAlertErrorGenerateImage('')
      }, 2000);
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }
  return (
    <section className='max-w-7xl  mx-auto'>
      {/* Header */}
      <Header
        header={'Create and Share'}
        paragraph={"Create and share with the community a collection of creative photographs by DALL-E AI."}
      />

      {/* Form */}

      <form className='relative z-0 group mt-16 max-w-3xl'
        onSubmit={handleSubmit}

      >
        <div className="flex flex-col gap-5">
          <FormField
            labelName={'Your name'}
            type={'text'}
            name={'name'}
            placeholder={'agha'}
            value={form.name}
            handleChange={handleChange}
          />
          <FormField
            labelName={'Prompt'}
            type={'text'}
            name={'prompt'}
            placeholder={'A Samurai riding a Horse on Mars, lomography.'}
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          {/* Image */}
          <div className="relative border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-46 p-3 h-64 flex justify-center items-center">

            {form.photo
              ? (<img loading='lazy' src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />)
              : (<img src={preview} alt='preview' className='w-full  h-full object-contain opacity-40' />)
            }

            {/* Loading */}
            {generatingImg && (
              <div className='absolute inset-0 z-0 flex justify-center items-center  rounded-lg bg-[rgba(0,0,0,0.19)]'>
                <Loader />
              </div>
            )}

          </div>

        </div>

        {alertErrorGenerateImage !== '' ? <span className='text-red-700 font-semibold'>{alertErrorGenerateImage}</span> : null}
        <div className="mt-5 flex gap-5">
          <button
            type='button'
            onClick={generateImage}
            className='text-white bg-green-700 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {generatingImg ? "Generating ..." : "Generate"}
          </button>
        </div>

        <div className="mt-10">
          <p className='mt-2 text-[#666e75] text-sm'>
            Once you have created your image, you can share it with others in the community
          </p>

          <button
            type='submit'
            className='mt-3 text-white bg-[#6469ff] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          >
            {loading ? "Sharing ..." : "Share with the community"}
          </button>
        </div>

      </form>

    </section >
  )
}
