import { useState } from 'react'
import { Button } from '../components/Button'
import { getApiClient } from '@/services/api'

interface Transaction {
  typeId: number
  date: Date | string
  productDescription: string
  valueInCents: number
  sellerName: string
}

export function DragAndDropFileUploader() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    if(selectedFile) setFile(selectedFile)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const fileContent = event.target?.result
        const jsonData = transformToJSON(fileContent as string)
        sendToServer(jsonData);
      }
      reader.readAsText(file)
    }
  };

  const transformToJSON = (fileContent: string) => {
    const transactions: Transaction[] = []

    const lines = fileContent.match(/[^\r\n]+/g)

    lines?.forEach((line) => {
      if (line.trim() !== '') {
        const typeId = line.substring(0, 1).trim()
        const date = line.substring(1, 26).trim()
        const productDescription = line.substring(26, 56).trim()
        const value = parseFloat(line.substring(57, 66).trim())
        const sellerName = line.substring(66, 86).trim()
      
        const transaction: Transaction = {
          typeId: Number(typeId),
          date: new Date(date),
          productDescription,
          sellerName,
          valueInCents: value
        }

        transactions.push(transaction)
      }
    })

    return transactions

  }

  const sendToServer = async (jsonData: Transaction[]) => {
    const apiClient = getApiClient()
    await apiClient.post('/transactions', {
      transactions: jsonData
    })
    setFile(null)
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">.txt only</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
          </label>
        </div>
        <Button text='Upload'  type='submit' disabled={!file}  />
      </div>
    </form>
  )
}


