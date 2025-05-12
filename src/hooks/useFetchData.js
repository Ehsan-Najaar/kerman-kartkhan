import axios from 'axios'
import { useEffect, useState } from 'react'

const useFetchData = (url, method = 'GET', body = null, headers = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await axios({
          method,
          url,
          data: body,
          headers,
        })
        setData(response.data)
      } catch (err) {
        setError(err.response ? err.response.data : 'Error fetching data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url, method, body, headers])

  return { data, loading, error }
}

export default useFetchData
