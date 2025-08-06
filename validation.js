import { supabase } from './supabaseClient.js'

async function validate(id_user, id_book, id_employee) {

    try {
        const { data: user, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('id', id_user)
            .single()

        if (userError || !user) {
            return { status: 0, message: `User ${id_user} not found!` }
        }

        const { data: book, error: bookError } = await supabase
            .from('books')
            .select('id')
            .eq('id', id_book)
            .single()

        if (bookError || !book) {
            return { status: 0, message: `Book ${id_book} not found!` }
        }

        const { data: employee, error: employeeError } = await supabase
            .from('employees')
            .select('id')
            .eq('id', id_employee)
            .single()

        if (employeeError || !employee) {
            return { status: 0, message: `Employee ${id_employee} not found!` }
        }
        return { status: 1 }

    } catch (error) {
        return { status: 0, error }
    }
}

async function isBookAvailable(id_book) {

    const { data, error } = await supabase
        .from('books')
        .select('*')
        .eq('id', id_book)
        .eq('available', true)

    if (error || !data || data.length === 0) {
        return { status: 0, message: `Book ${id_book} is not available for rent` }
    }

    return { status: 1, data }
}

export { getUsers, getBooks, getEmployees, validate, isBookAvailable }