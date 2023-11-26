// import React from "react";
// import { useState } from "react";
// import { useEffect } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const TicketAction = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [tickets, setTickets] = useState([]);
//   const [ticket, setTicket] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/ticket/${id}`)
//       .then((res) => res.json())
//       .then((info) => setTicket(info));
//   }, [id]);

//   useEffect(() => {
//     fetch(`http://localhost:5000/reply-tickets`)
//       .then((res) => res.json())
//       .then((info) => setTickets(info));
//   }, []);



//   return (
//     <>
//       <section className="touch" data-aos="fade-up" data-aos-duration={2000}>
//         <div className="container">
//           <div className="row">
//             <div className="col-12">
//               <div className="block-text center">
//                 <h6 className="sub-heading">
//                   <span>Support</span>
//                 </h6>
//                 <h3 className="heading">Help Center</h3>
//               </div>
//               <div className="touch__main">
//                 <form
//                   className="form-box box__color"
                
//                 >
//                   <input
//                     type="text"
//                     name="ticketCreator"
//                     defaultValue={ticket.ticketCreator}
//                   />
//                   <input
//                     type="text"
//                     name="ticketID"
//                     defaultValue={ticket._id}
//                   />
//                   <input
//                     type="text"
//                     name="creatorMessage"
//                     defaultValue={ticket.message}
//                   />

//                   <div className="row">
//                     <div className="col">
//                       <label>Subject</label>
//                       <input
//                         required
//                         type="text"
//                         className="form-control"
//                         name="subject"
//                         defaultValue={ticket.subject}
//                       />
//                     </div>
//                   </div>
//                   <div className="row">
//                     <div className="col">
//                      <div>
//                      <label>User's Message</label>
//                       <p>{ticket.message}</p>
//                      </div>
//                      <div className="mt-15">
//                       {
//                         tickets.map(t=> ticket._id === t.ticketID &&
//                          <div>
//                           <label>User's Reply</label>
//                           <p>{t.creatorReply}</p>
//                          </div>
//                           )
//                       }
//                      <label>User's Reply</label>
//                       <p>{ticket.message}</p>
//                      </div>
//                      <div className="mt-15">
                      
//                       {tickets.map(
//                         (t) =>
//                           ticket._id === t.ticketID && 
//                           <div className="mt-15"><label>Admin's Message</label>
//                           <p>{t.adminMessage}</p></div>
//                       )}
//                     </div>

//                     </div>
                    
//                   </div>

//                   <div className="row">
//                     <div className="col">
//                       <label>Reply</label>
//                       <textarea
//                         required
//                         name="creatorReply"
//                         cols={30}
//                         rows={10}
//                       />
//                     </div>
//                   </div>
//                   <div className="row mb-0">
//                     <div className="col">
//                       <button type="sumbit" className="action-btn">
//                         <span>Reply Now</span>
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default TicketAction;

import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TicketAction = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/ticket/${id}`)
      .then((res) => res.json())
      .then((info) => setTicket(info));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:5000/reply-tickets`)
      .then((res) => res.json())
      .then((info) => setTickets(info));
  }, []);

  return (
    <>
      <section className="touch" data-aos="fade-up" data-aos-duration={2000}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="block-text center">
                <h6 className="sub-heading">
                  <span>Support</span>
                </h6>
                <h3 className="heading">Help Center</h3>
              </div>
              <div className="touch__main">
                <form className="form-box box__color">
                  <div className="message-container">
                    {tickets.map((t, index) => {
                      if (ticket._id === t.ticketID) {
                        return (
                          <div key={t._id} className="message">
                            {index % 2 === 0 ? (
                              <>
                                <label>User's Reply</label>
                                <p>{t.creatorMessage}</p>
                              </>
                            ) : (
                              <>
                                <label>Admin's Reply</label>
                                <p>{t.adminMessage}</p>
                              </>
                            )}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div className="row">
                    <div className="col">
                      <label>Reply</label>
                      <p required name="creatorReply" cols={30} rows={10} />
                    </div>
                  </div>
                  <div className="row mb-0">
                    <div className="col">
                      <button type="submit" className="action-btn">
                        <span>Reply Now</span>
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TicketAction;
