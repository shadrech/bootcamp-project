class CourseApi {
  async fetchAll() {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/course`)
    return data.json()
  }

  async create(body) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/course`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(body)
    })
    return data.json()
  }
}

export const courseApi = new CourseApi()
