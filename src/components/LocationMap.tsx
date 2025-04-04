
const LocationMap = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Visit Our Store</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience our collections in person at our flagship store located in the heart of the city
          </p>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="h-96 w-full">
            {/* Google Maps iframe */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.9252149633783!2d72.5646!3d23.022!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDAxJzE5LjIiTiA3MsKwMzMnNTIuNiJF!5e0!3m2!1sen!2sin!4v1617806723520!5m2!1sen!2sin" 
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
                123 Jewelry Lane<br />
                Diamond District<br />
                City, State 12345
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
                Phone: +123 456 7890<br />
                Email: info@biswakarma.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
