import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Shared/Loading";

const ReceivedPayment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updatePaymentStatus = async () => {
      try {
        const updateOrder = { paymentStatus: "Received" };
        const url = `http://localhost:5000/payment-received/${id}`;
        const response = await fetch(url, {
          method: "PUT",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(updateOrder),
        });

        if (response.ok) {
          setTimeout(() => {
            formRef.current.submit();
            setLoading(false);
            navigate("/user-dashboard");
          }, 1500);
        } else {
          console.error("Payment update failed.");
          setLoading(false);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setLoading(false);
      }
    };

    updatePaymentStatus();
  }, [id, navigate]);

  return (
    <div>
      <div>
        {loading ? (
        <Loading
        ></Loading>
        ) : (
          <section className="testimonials s2">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <div className="testimonials__main">
                    <div className="block-text center">
                      <h4 className="heading">
                        We have received your payment.
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <form
          ref={formRef}
          id="receivedPaymentForm"
          onSubmit={(event) => event.preventDefault()}
        >
          <input hidden type="text" name="paymentStatus" value="Received" />
          <input hidden type="submit" value="Payment Received" />
        </form>
      </div>
    </div>
  );
};

export default ReceivedPayment;
