/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
};

export default nextConfig;

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     reactStrictMode: true,
//     async headers() {
//         return [
//             {
//                 source: '/api/webhooks',
//                 headers: [
//                     {
//                         key: 'Content-Type',
//                         value: 'application/json',
//                     },
//                 ],
//             },
//         ];
//     },
// };
//
// export default nextConfig;
