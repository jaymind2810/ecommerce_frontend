/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

const WebNewsLetterPanel = () => {
  return (
    <section>
    <div className="isolate overflow-hidden py-16 relative">
      <div className="border max-w-7xl mx-auto p-16 rounded-lg">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-gray-700 sm:text-4xl">Subscribe to our newsletter.</h2>
            <p className="mt-4 text-lg leading-8 text-gray-600">
              Nostrud amet eu ullamco nisi aute in ad minim nostrud adipisicing velit quis. Duis tempor incididunt
              dolore.
            </p>
            <div className="mt-6 flex max-w-md gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-700  focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                placeholder="Enter your email"
              />
              <button
                type="submit"
                className="flex-none rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                Subscribe
              </button>
            </div>
          </div>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="bg-gray-100 flex flex-col items-start p-4 rounded-lg">
              <div className="border border-gray-400 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
                <CalendarDaysIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-gray-700">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-500">
                Non laboris consequat cupidatat laborum magna. Eiusmod non irure cupidatat duis commodo amet.
              </dd>
            </div>
            <div className="bg-gray-100 flex flex-col items-start p-4 rounded-lg">
              <div className="border border-gray-400 bg-gray-200 hover:bg-gray-300 p-2 rounded-lg">
                <HandRaisedIcon className="h-6 w-6 text-gray-700" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-gray-700">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-500">
                Officia excepteur ullamco ut sint duis proident non adipisicing. Voluptate incididunt anim.
              </dd>
            </div>
          </dl>
        </div>
      </div>
      
    </div>
    </section>
  )
}

export default WebNewsLetterPanel