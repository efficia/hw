import { useEffect, useRef } from "react";
import { Phone, Mail, Building2, User, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useSearchParams } from "react-router-dom";
import { contacts } from "../data/contacts";

const Contact = () => {
  const [searchParams] = useSearchParams();
  const profileId = searchParams.get("profile") || "default";
  const contactInfo = contacts[profileId] || contacts.default;
  const downloadTriggered = useRef(false);
  const qrRef = useRef<HTMLDivElement | null>(null);

  // Generate vCard content
  const vCardContent = `BEGIN:VCARD
VERSION:3.0
N:${contactInfo.lastName};${contactInfo.firstName};;;
TITLE:${contactInfo.designation}
EMAIL;type=INTERNET;type=WORK:${contactInfo.email}
EMAIL;type=INTERNET;type=WORK:${contactInfo.secondaryEmail}
TEL;type=CELL:${contactInfo.mobile}
TEL;type=CELL:${contactInfo.mobile2}
TEL;type=WORK:${contactInfo.work}
END:VCARD`;

  const vCardUrl = `data:text/vcard;charset=utf-8,${encodeURIComponent(
    vCardContent
  )}`;

  useEffect(() => {
    if (!downloadTriggered.current) {
      const link = document.createElement("a");
      link.href = vCardUrl;
      link.download = `${contactInfo.fullName}.vcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      downloadTriggered.current = true;
    }
  }, [vCardUrl, contactInfo.fullName]);

  // Download QR Code Option
  const downloadQRCode = () => {
    if (!qrRef.current) return;

    const svgElement = qrRef.current.querySelector("svg");
    if (!svgElement) return;

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "qrcode.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen pt-1 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="md:flex">
              {/* Contact Information */}
              <div className="md:flex-1">
                <div className="bg-blue-600 px-8 py-12 text-white text-center md:text-left">
                  <div className="inline-block p-4 rounded-full bg-white/10 mb-4">
                    <User className="w-12 h-12" />
                  </div>
                  <h1 className="text-3xl font-bold mb-2">
                    {contactInfo.fullName}
                  </h1>
                  <p className="text-blue-100">{contactInfo.designation}</p>
                </div>

                <div className="px-8 py-12 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Company</p>
                      <p className="font-medium">{contactInfo.company}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mobile</p>
                      <a
                        href={`tel:${contactInfo.mobile}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {contactInfo.mobile}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">WhatsApp</p>
                      <a
                        href={`tel:${contactInfo.mobile2}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {contactInfo.mobile2}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Office</p>
                      <a
                        href={`tel:${contactInfo.work}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {contactInfo.work}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Work</p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="font-medium hover:text-blue-600"
                      >
                        {contactInfo.secondaryEmail}
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 md:hidden">
                    <a
                      href={vCardUrl}
                      download={`${contactInfo.fullName}.vcf`}
                      className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Contact
                    </a>
                  </div>
                </div>
              </div>

              {/* QR Code Section */}
              <div className="hidden md:flex md:w-80 bg-gray-50 flex-col items-center justify-center p-8 border-l border-gray-100">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Scan to Add Contact
                  </h3>
                  <p className="text-sm text-gray-600">
                    Use your phone's camera to scan and save contact
                  </p>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-md" ref={qrRef}>
                  <QRCodeSVG
                    value={vCardContent}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>

                {/* Download QR as SVG Button */}
                <button
                  onClick={downloadQRCode}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download QR
                </button>

                <div className="mt-8 w-full">
                  <a
                    href={vCardUrl}
                    download={`${contactInfo.fullName}.vcf`}
                    className="flex items-center justify-center w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Download className="w-5 h-5 mr-2" />
                    Download Contact
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
