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
        {howMuchTime} days left!!!!!
    </div>
      <div className="response-url">
        <div className='hurry-announcement'> {howMuchTime < 7 && `😱😱 Hurry!!!😩😩`} </div>
        <div className='registration-details'>
          {selectedState[0] && selectedState[0].onlineAccepted ? (
            <>
              You can register online. Visit your state's official website {selectedState[0] && <a href={selectedState[0].url}>here.</a>}
              {howMuchTime >= 7 && <div> You should do it now!! 👋 </div>}
            </>
          ) :
            (
              <>
                You <strong>can't</strong> register online!!! Go <a href={selectedState[0] && selectedState[0].url}>here </a> for your registration form, then mail it in or drop it off before the due date! Hurry the f up!!!
          </>
            )}
        </div>
      </div>
    </div>
  )

}

export default Response;
