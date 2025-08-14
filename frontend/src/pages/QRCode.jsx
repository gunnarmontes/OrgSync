import NavBar from "../components/NavBar";

export default function QrCode() {
  const qrUrl = "https://your-org-site.com/register/member/"; // The URL the QR code points to

  const handleDownload = () => {
    alert("Download clicked — will implement download later.");
  };

  const handleShare = () => {
    alert("Share clicked — will implement share later.");
  };

  return (
    <div className="min-h-screen bg-blue-900 text-gray-100">
      <header className="max-w-5xl mx-auto px-4 pt-6">
        <NavBar />
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        <h1 className="text-2xl font-semibold mb-6">Organization QR Code</h1>

        <img
          src={"https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/assets/media/images/api_page/qrcodes/bw/Api_page_-_QR-Code-Generator_com-3.png"}
          alt="QR Code"
          className="bg-white p-4 rounded-lg shadow-lg w-64 h-64"
        />

        <p className="mt-4 opacity-80 text-center">
          Scan this code to visit: <br />
          <span className="text-blue-300">{qrUrl}</span>
        </p>

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleDownload}
            className="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded"
          >
            Download
          </button>
          <button
            onClick={handleShare}
            className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded"
          >
            Share
          </button>
        </div>
      </main>
    </div>
  );
}
