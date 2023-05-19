import React from "react"
import { Link } from "react-router-dom"

const ErrorPage = () => {

    return (
        <div class="flex items-center justify-center h-screen">
            <div class="bg-white shadow p-8 rounded-lg">
                <h1 class="text-3xl font-bold mb-6 text-red-500">Oops! Something went wrong.</h1>
                <p class="text-gray-700">We apologize for the inconvenience. An unexpected error has occurred.</p>
                <p class="text-gray-700">Please try again later.</p>
                <div class="mt-8">
                    <Link to="/" class="text-blue-500 hover:underline">Go back to homepage</Link>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage