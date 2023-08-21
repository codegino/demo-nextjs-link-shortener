import React from 'react';
import {sql} from '@vercel/postgres';

const Page = async () => {
  const links = await getData();

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8">
      <h1 className="text-2xl font-bold mb-5 text-gray-900">Links stats</h1>
      <p>Add an alias to the end the URL to go to the target URL</p>
      <p className="mb-5">
        Example:{' '}
        <a
          href="https://links.codegino.com/gino"
          className="text-blue-600 hover:text-blue-500"
        >
          https://links.codegino.com/gino
        </a>
      </p>

      <div className="flex flex-col items-center overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left font-medium">Alias</th>
              <th className="px-6 py-3 text-left font-medium">Target</th>
              <th className="px-6 py-3 text-left font-medium">Visit Count</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {links.map((link, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{link.alias}</td>
                <td className="px-6 py-4 whitespace-nowrap">{link.target}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {link.visit_count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const getData = async () => {
  const {rows} = await sql`SELECT * FROM links`;

  return rows;
};

export default Page;
