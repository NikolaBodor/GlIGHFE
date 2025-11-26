import { createRoutesFromElements, Route } from 'react-router'
import App from './components/App.tsx'
import { UploadPage } from './components/Upload.tsx'
import Layout from './components/Layout.tsx'

export default createRoutesFromElements(
  <Route path="/" element={<Layout />}>
    <Route index element={<App />} />
    <Route path="/upload" element={<UploadPage />} />
  </Route>,
)
