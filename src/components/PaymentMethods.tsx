
const PaymentMethods = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Payment Methods</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We offer a variety of secure payment options for your convenience
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-6 max-w-3xl mx-auto mb-8">
          {/* Payment method icons */}
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <img src="/placeholder.svg" alt="Credit Card" className="w-10 h-10" />
            </div>
            <span className="text-sm text-gray-600">Credit Card</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <img src="/placeholder.svg" alt="Debit Card" className="w-10 h-10" />
            </div>
            <span className="text-sm text-gray-600">Debit Card</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <img src="/placeholder.svg" alt="UPI" className="w-10 h-10" />
            </div>
            <span className="text-sm text-gray-600">UPI</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mb-2">
              <img src="/placeholder.svg" alt="Bank Transfer" className="w-10 h-10" />
            </div>
            <span className="text-sm text-gray-600">Bank Transfer</span>
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-gray-600 italic">
            * All transactions are secure and encrypted.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PaymentMethods;
