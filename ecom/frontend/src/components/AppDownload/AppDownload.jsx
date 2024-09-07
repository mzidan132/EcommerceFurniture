import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'
const AppDownload = () => {
  return (
    <div class="pagination">
  <button class="page-button" disabled>&lt;</button>
  <button class="page-button active">1</button>
  <button class="page-button">2</button>
  <button class="page-button">...</button>
  <button class="page-button">9</button>
  <button class="page-button">10</button>
  <button class="page-button">&gt;</button>
</div>

  )
}

export default AppDownload