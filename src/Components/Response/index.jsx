import React from 'react';
import moment from 'moment';


import './Response.css';

function Response({ selectedState }) {
  let howMuchTime;
  console.log(selectedState);

  const currentDate = moment();

  if (selectedState.length > 0 && selectedState[0].deadline) {
    const momentDeadlineDate = moment(selectedState[0].deadline)
    howMuchTime = momentDeadlineDate.diff(currentDate, 'days');
  }
  console.log(howMuchTime);
  return (
    <div className="response">
      <div className="response-text">
        {selectedState[0] && selectedState[0].value === 'ND' ? '' :
          (
            howMuchTime + ' days left'
          )
        }
      </div>
      <div className="response-url">
        <div className='hurry-announcement'> {howMuchTime < 7 && `😱😱 Hurry!!!😩😩`} </div>
        <div className='registration-details'>
          {selectedState[0] && selectedState[0].value === 'ND' ? " You don't have to register to vote. If you live in North Dakota, you're all set. Nice!" :
            (
              <>
                {selectedState[0] && selectedState[0].onlineAccepted ? (
                  <>
                    You can register online. Visit your state's official website {selectedState[0] && <a href={selectedState[0].url}>here.</a>}
                    {howMuchTime >= 7 && selectedState[0] && !selectedState[0].lastMinuteAccepted && <div> You should do it now!! 👋 </div>}
                    <div className='second-message'> {selectedState[0].lastMinuteAccepted && <div> <strong>You</strong> can even register in person on election day. Lucky you! But don't risk waiting in line or any other shenanigans, just do it now! 🇺🇸 </div>}</div>
                  </>
                ) :
                  (
                    <>
                      You <strong>can't</strong> register online 😩 Go <a href={selectedState[0] && selectedState[0].url}>here </a> for your registration info, you can register in person or possibly mail or drop off your form before the due date. Hurry!!
                <div className='second-message'>{selectedState[0] && selectedState[0].lastMinuteAccepted && <div> You can also register in person on election day. But don't risk waiting in line or any other shenanigans, just do it now! 🇺🇸 </div>}
                      </div>
                    </>
                  )
                }
              </>
            )}

        </div>
      </div>
    </div>
  )

}

export default Response;
