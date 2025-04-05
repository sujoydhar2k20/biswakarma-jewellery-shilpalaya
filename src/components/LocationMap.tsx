
const LocationMap = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-4">Visit Our Store</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Experience our collections in person at our flagship store located in Barasat, Kolkata
          </p>
        </div>
        
        <div className="bg-white shadow-xl rounded-3xl overflow-hidden border border-rose-100">
          <div className="h-[500px] w-full">
            <iframe 
              src="https://maps.app.goo.gl/UCK9EmfTDrvrJLnJ8"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy"
              title="Store Location"
              className="w-full h-full"
            ></iframe>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
            <div className="p-8 text-center hover:bg-rose-50 transition-colors">
              <h3 className="font-playfair font-semibold text-xl mb-3">Address</h3>
              <p className="text-gray-600">
                Barasat Near Subhash Maidan<br />
                Kolkata 700126<br />
                West Bengal, India
              </p>
            </div>
            <div className="p-8 text-center hover:bg-rose-50 transition-colors">
              <h3 className="font-playfair font-semibold text-xl mb-3">Opening Hours</h3>
              <p className="text-gray-600">
                Monday - Saturday: 10:00 AM - 8:00 PM<br />
                Sunday: 11:00 AM - 6:00 PM
              </p>
            </div>
            <div className="p-8 text-center hover:bg-rose-50 transition-colors">
              <h3 className="font-playfair font-semibold text-xl mb-3">Contact</h3>
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
