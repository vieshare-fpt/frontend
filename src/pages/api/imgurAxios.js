import axios from 'axios'
import React from 'react'

export default function imgurAxios() {
  return (
    <div>imgurAxios</div>
  )
}

const imgurAxios = axios.create({
    headers: {
        Authorization: 'Client-ID {{clientId}}',
    },
})