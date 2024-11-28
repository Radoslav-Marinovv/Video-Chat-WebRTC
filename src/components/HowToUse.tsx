function HowToUse() {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">How to Use</h2>
      <h3 className="text-xl font-semibold mt-4">Peer A:</h3>
      <ol className="list-decimal list-inside ml-4">
        <li>Click "Create Offer."</li>
        <li>Copy the SDP from the console and share it with Peer B.</li>
      </ol>
      <h3 className="text-xl font-semibold mt-4">Peer B:</h3>
      <ol className="list-decimal list-inside ml-4">
        <li>Paste the offer SDP in the "Paste Offer/Answer SDP here" text area.</li>
        <li>Click "Set Remote Description."</li>
        <li>Click "Create Answer."</li>
        <li>Copy the generated answer SDP from the console and share it with Peer A.</li>
      </ol>
      <h3 className="text-xl font-semibold mt-4">Peer A:</h3>
      <ol className="list-decimal list-inside ml-4">
        <li>Paste the answer SDP in the "Paste Offer/Answer SDP here" text area.</li>
        <li>Click "Set Remote Description."</li>
      </ol>
      <h3 className="text-xl font-semibold mt-4">ICE Candidates:</h3>
      <ol className="list-decimal list-inside ml-4">
        <li>Both peers can copy ICE candidates from their console and paste them into each other's "Paste ICE Candidate here" text area.</li>
        <li>Click "Add ICE Candidate."</li>
      </ol>
    </div>
  )
}

export default HowToUse