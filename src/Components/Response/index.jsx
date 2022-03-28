import React from 'react';
import moment from 'moment';
import './Response.css';

const Response = ({ selectedState, primaryOrGeneral }) => {
  let howMuchTime;
  let howMuchTimeSmaller;
  let primaryDate;
  let primaryDeadline;
  let momentDeadlineDate;
  const currentSelectedState = selectedState[0];
  const currentDate = moment();

  if (selectedState.length > 0 && currentSelectedState.deadline) {
    momentDeadlineDate = moment(`${primaryOrGeneral === 'general' ? currentSelectedState.deadline : currentSelectedState.primaryDeadline}T235959`);
    primaryDate = primaryOrGeneral === 'primary' ? moment(`${currentSelectedState.primaryDate}T235959`).format('MMMM Do') : null;
    primaryDeadline = primaryOrGeneral === 'primary' ? moment(`${currentSelectedState.primaryDeadline}T235959`).format('MMMM Do') : null;
    howMuchTime = momentDeadlineDate.diff(currentDate, 'days');
    howMuchTimeSmaller = momentDeadlineDate.diff(currentDate);
  }
  return (
    <div className='response'>
      <div className={howMuchTime < 7 ? 'days-left-text urgent' : 'days-left-text'}>
        {(currentSelectedState && currentSelectedState.value === 'ND') || howMuchTime <= 0 ? '' :
          (
            howMuchTime === 1 ? howMuchTime + ' day left' : howMuchTime + ' days left'
          )
        }
      </div>
      <div className='state-emoji'>
        <span role='img' aria-label='emoji-representing-each-state'>
          {currentSelectedState && currentSelectedState.emoji}
        </span>
      </div>
      {primaryDate &&
        <div className='primary-sentence'>
          The deadline to register to vote in {currentSelectedState.label} {howMuchTimeSmaller < 0 ? 'was' : 'is'} <span className='primary-date'>{primaryDeadline}</span>, for the primary election on <span className='primary-date'>{primaryDate}</span>.
        </div>
      }
         {!primaryDate &&
        <div className='primary-sentence'>
          The deadline to register to vote in {currentSelectedState.label} {howMuchTimeSmaller < 0 ? 'was' : 'is'} <span className='primary-date'>{momentDeadlineDate.format('MMMM Do')}</span>, for the election on <span className='primary-date'>{currentSelectedState.label === 'Louisiana' ? 'December 10th' : 'November 8th'}</span>.
        </div>
      }
      <div className='response-url'>
        <div className='registration-details'>
          {currentSelectedState && currentSelectedState.value === 'ND' ? " You don't have to register to vote. If you live in North Dakota, you're all set. Nice!" :
            (
              <>
                {howMuchTimeSmaller < 0 && currentSelectedState && currentSelectedState.lastMinuteAccepted && "That deadline's passed! But you can still register in person on your voting day. Check the state link above or find details at your local polling place."}
                {howMuchTimeSmaller < 0 && currentSelectedState && !currentSelectedState.lastMinuteAccepted && (primaryDate ? "The deadline's passed - check to see if you can still register for the general election!" : "That deadline's passed - hope you registered!")}
                <div className='last-day-announcement'>{howMuchTimeSmaller > 0 && howMuchTime === 0 && 'Today is the last day you can register!'}</div>
                {howMuchTimeSmaller > 0 && howMuchTime >= 0 && currentSelectedState && currentSelectedState.onlineAccepted ? (
                  <>
                    You can register online. Here's your {currentSelectedState && <a href={currentSelectedState.url}>state's official website</a>} to do so or get more info.
                    {howMuchTime >= 7 && currentSelectedState && !currentSelectedState.lastMinuteAccepted && <div> You should do it now!! </div>}
                    {howMuchTime < 7 && howMuchTime >= 0 && <div className='hurry-announcement'><span role='img' aria-label='screaming-guy-emoji'>😱</span> Hurry!! <span role='img' aria-label='weary-guy-emoji'>😩</span> </div>}
                    <div className='second-message'> {currentSelectedState.lastMinuteAccepted && <div> <strong>You</strong> can even register in person on election day. Lucky you! But don't risk waiting in line, just do it now! 🇺🇸 </div>}</div>
                  </>
                ) :
                  (
                    <>
                      {howMuchTimeSmaller > 0 && howMuchTime >= 0 &&
                        <div>You <strong>can't</strong> register online <span role='img' aria-label='weary-guy-emoji'>😩</span> Go <a href={currentSelectedState && currentSelectedState.url}>to your state's official website</a> for your registration info, you can register in person or possibly mail or drop off your form before the due date. Hurry!!
                <div className='second-message'>{currentSelectedState && currentSelectedState.lastMinuteAccepted && <div> You can also register in person on election day. But don't risk waiting in line, just do it now if you can! <span role='img' aria-label='us-flag-emoji'>🇺🇸</span> </div>}
                          </div> </div>}
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
