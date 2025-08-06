import express from 'express'
import { supabase } from './supabaseClient.js'
import { validate, isBookAvailable } from './validation.js'

const app = express()
app.use(express.json())

function handleError(res, message, error, status = 500) {
  return res.status(status).json({ status: 0, message, error })
}

function handleSuccess(res, data, message = 'Success') {
  return res.status(200).json({ status: 1, message, data })
}

app.post('/books', async (req, res) => {
  const { name, author, publisher, released_date, isbn, literary_genre, age_rating, available = true } = req.body

  const { data, error } = await supabase.from('books').insert([{ name, author, publisher, released_date, isbn, literary_genre, age_rating, available }]).select()
  
  if (error) return handleError(res, 'Error adding book to database', error)
  return handleSuccess(res, data, 'Book added successfully')
})

app.get('/books', async (req, res) => {
  const { data, error } = await supabase.from('books').select('*')
  if (error) return handleError(res, 'Error retrieving books', error)
  return handleSuccess(res, data, 'Books retrieved successfully')
})

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('books').delete().eq('id', id).select()
  if (error) return handleError(res, 'Error deleting book', error)
  return handleSuccess(res, data, 'Book deleted successfully')
})

app.post('/users', async (req, res) => {
  const { name, email, phone_number } = req.body

  const { data, error } = await supabase.from('users').insert([{ name, email, phone_number }]).select()
  
  if (error) return handleError(res, 'Error adding user to database', error)
  return handleSuccess(res, data, 'User added successfully')
})

app.get('/users', async (req, res) => {
  const { data, error } = await supabase.from('users').select('*')
  if (error) return handleError(res, 'Error retrieving users', error)
  return handleSuccess(res, data, 'Users retrieved successfully')
})

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('users').delete().eq('id', id).select()
  if (error) return handleError(res, 'Error deleting user', error)
  return handleSuccess(res, data, 'User deleted successfully')
})

app.post('/employees', async (req, res) => {
  const { name, registration_number } = req.body

  const { data, error } = await supabase.from('employees').insert([{ name, registration_number }]).select()

  if (error) return handleError(res, 'Error adding employee to database', error)
  return handleSuccess(res, data, 'Employee added successfully')
})

app.get('/employees', async (req, res) => {
  const { data, error } = await supabase.from('employees').select('*')
  if (error) return handleError(res, 'Error retrieving employees', error)
  return handleSuccess(res, data, 'Employees retrieved successfully')
})

app.delete('/employees/:id', async (req, res) => {
  const { id } = req.params
  const { data, error } = await supabase.from('employees').delete().eq('id', id).select()
  if (error) return handleError(res, 'Error deleting employee', error)
  return handleSuccess(res, data, 'Employee deleted successfully')
})

app.get('/consult_rented_books', async (req, res) => {
  const { data, error } = await supabase.from('rented_books').select('*')

  if (error) return handleError(res, 'Error retrieving rented books', error)
  return handleSuccess(res, data, 'Rented books retrieved successfully')
})

app.post('/rented_books', async (req, res) => {
  const { id_user, id_book, id_employee, rented_in, returned_in } = req.body

  const validation = await validate(id_user, id_book, id_employee)
  if (validation.status === 0) return res.status(400).json(validation)

  const isAvailable = await isBookAvailable(id_book)
  if (isAvailable.status === 0) return res.status(400).json(isAvailable)

  const { data, error } = await supabase.from('rented_books').insert([{ id_user, id_book, id_employee, rented_in, returned_in }]).select()
  if (error) return handleError(res, 'Error registering loan', error)

  const { data: updatedBook, error: updateError } = await supabase.from('books').update({ available: false }).eq('id', id_book).select()
  if (updateError) return handleError(res, 'Error updating book availability', updateError)

  return res.status(200).json({
    status: 1,
    message: 'Book rented successfully',
    rented_book: data,
    updated_book: updatedBook
  })
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started on http://localhost:${process.env.PORT || 3000}`)
})