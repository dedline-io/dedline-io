import React from 'react';
import moment from 'moment';


import './Response.css';

function Response({ selectedState }) {
  let howMuchTime;
  const currentSelectedState = selectedState[0];
  const currentDate = moment();

  if (selectedState.length > 0 && currentSelectedState.deadline) {
    const momentDeadlineDate = moment(currentSelectedState.deadline)
    howMuchTime = momentDeadlineDate.diff(currentDate, 'days');
  }
  return (
    <div className="response">
      <div className="days-left-text">
        {currentSelectedState && currentSelectedState.value === 'ND' ? '' :
          (
            howMuchTime + ' days left'
          )
        }
      </div>
      <div className='state-emoji'>
        <span role='img' aria-label='emoji-representing-each-state'>
          {currentSelectedState && currentSelectedState.emoji}
        </span>
      </div>
      <div className="response-url">
        <div className='hurry-announcement'> {howMuchTime < 7 && `😱😱 Hurry!!!😩😩`} </div>
        <div className='registration-details'>
          {currentSelectedState && currentSelectedState.value === 'ND' ? " You don't have to register to vote. If you live in North Dakota, you're all set. Nice!" :
            (
              <>
                {currentSelectedState && currentSelectedState.onlineAccepted ? (
                  <>
                    You can register online. Visit your state's official website {currentSelectedState && <a href={currentSelectedState.url}>here.</a>}
                    {howMuchTime >= 7 && currentSelectedState && !currentSelectedState.lastMinuteAccepted && <div> You should do it now!! </div>}
                    <div className='second-message'> {currentSelectedState.lastMinuteAccepted && <div> <strong>You</strong> can even register in person on election day. Lucky you! But don't risk waiting in line or any other shenanigans, just do it now! 🇺🇸 </div>}</div>
                  </>
                ) :
                  (
                    <>
                      You <strong>can't</strong> register online <span role='img' aria-label='weary-guy-emoji'>😩</span> Go <a href={currentSelectedState && currentSelectedState.url}>here </a> for your registration info, you can register in person or possibly mail or drop off your form before the due date. Hurry!!
                <div className='second-message'>{currentSelectedState && currentSelectedState.lastMinuteAccepted && <div> You can also register in person on election day. But don't risk waiting in line or any other shenanigans, just do it now if you can! <span role='img' aria-label='us-flag-emoji'>🇺🇸</span> </div>}
                      </div>
                    </>
                  )
                }
              </>
            )}
        </div>
        <div className='registration-notes'>
          {currentSelectedState && currentSelectedState.notes}
        </div>
      </div>
    </div>
  )

}

export default Response;
