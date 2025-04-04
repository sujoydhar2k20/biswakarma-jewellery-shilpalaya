
const LocationMap = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Visit Our Store</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our collections in person at our flagship store located in Barasat, Kolkata
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="h-96 w-full">
            {/* Google Maps iframe - updated to point to Barasat, Kolkata */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29378.38542238767!2d88.46624071938475!3d22.72683345897139!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f89faa58ddf84d%3A0x3bf7d3f2877c7423!2sSubhash%20Maidan!5e0!3m2!1sen!2sin!4v1712254840379!5m2!1sen!2sin"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Store Location"
            ></iframe>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <div className="p-6 text-center">
              <h3 className="font-playfair font-semibold mb-2">Address</h3>
              <p className="text-gray-600">
                Barasat Near Subhash Maidan<br />
                Kolkata 700126<br />
                West Bengal, India
              </p>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-playfair font-semibold mb-2">Opening Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 6:00 PM
              </p>
            </div>
            <div className="p-6 text-center">
              <h3 className="font-playfair font-semibold mb-2">Contact</h3>
              <p className="text-gray-600">
                Phone: +919874085669<br />
                Email: support@biswakarmagold.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
