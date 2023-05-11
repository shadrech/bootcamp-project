class StudentApi {
  async fetchAll() {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student`)
    return data.json()
  }

  async fetchOne(id) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student/${id}`)
    return data.json()
  }

  async create(name, email) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ name, email })
    })
    return data.json()
  }

  async update(studentId, body) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student/${studentId}`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify(body)
    })
    return data.json()
  }

  async createEnrollment(studentId, courseId) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student/${studentId}/enroll`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ courseId })
    })
    return data.json()
  }

  async updateEnrollment(studentId, courseId, score, grade) {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/student/${studentId}/enroll`, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PUT',
      body: JSON.stringify({ courseId, score, grade })
    })
    return data.json()
  }

  async delete(studentId) {
    await fetch(`${process.env.REACT_APP_API_URL}/student/${studentId}`, {
      method: 'DELETE'
    })
    return true
  }
}

export const studentApi = new StudentApi()
