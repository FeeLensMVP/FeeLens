export default function Subscribe() {
  return (
    <div className="text-center my-12">
      <h2 className="text-3xl font-bold">Join the Waitlist</h2>
      <p className="mt-3 text-gray-600">
        Be the first to try FeeLens and stop overpaying bank fees.
      </p>
      <a
        href="https://docs.google.com/forms/d/e/1FAIpQLSd_QEhaQNvm6F0MBWZ30qXbBo_PzQEbNENc9RM29F2G1_UMiw/viewform?usp=header"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        Subscribe Now
      </a>
    </div>
  );
}
