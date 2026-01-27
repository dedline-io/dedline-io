import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import moment from 'moment';
import config from '../../config';
import './Widget.css';

const Widget = () => {
  const { state } = useParams();
  const [searchParams] = useSearchParams();
  const isCompact = searchParams.get('compact') === 'true';
  const [stateData, setStateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [electionType, setElectionType] = useState('general'); // default to general

  useEffect(() => {
    const url = config.apiUrl;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((jsonData) => {
        const states = jsonData.states;
        const foundState = states.find(s => s.value === state.toUpperCase());

        if (foundState) {
          setStateData(foundState);
          setLoading(false);
        } else {
          setError('State not found');
          setLoading(false);
        }
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [state]);

  if (loading) {
    return <div className="widget-container">Loading...</div>;
  }

  if (error) {
    return <div className="widget-container">Error: {error}</div>;
  }

  if (!stateData) {
    return <div className="widget-container">State not found</div>;
  }

  const currentDate = moment();
  const deadline = electionType === 'general'
    ? stateData.deadline
    : stateData.primaryDeadline;
  const electionDate = electionType === 'general'
    ? '20261103'
    : stateData.primaryDate;

  const momentDeadlineDate = moment(`${deadline}T235959`);
  const daysLeft = momentDeadlineDate.diff(currentDate, 'days');
  const isPast = daysLeft < 0;

  if (isCompact) {
    return (
      <div className="widget-container compact">
        <div className="compact-content">
          <div className="compact-left">
            <div className="compact-header">
              <span className="widget-emoji">{stateData.emoji.substring(0, 2)}</span>
              <h2 className="compact-title">{stateData.label}</h2>
            </div>
            <div className="compact-toggle">
              <button
                className={`compact-toggle-btn ${electionType === 'primary' ? 'active' : ''}`}
                onClick={() => setElectionType('primary')}
              >
                Primary
              </button>
              <button
                className={`compact-toggle-btn ${electionType === 'general' ? 'active' : ''}`}
                onClick={() => setElectionType('general')}
              >
                General
              </button>
            </div>
          </div>

          <div className="compact-center">
            {!isPast && daysLeft >= 0 ? (
              <div className="compact-days">
                <div className="compact-days-number">{daysLeft}</div>
                <div className="compact-days-label">{daysLeft === 1 ? 'day left' : 'days left'}</div>
              </div>
            ) : (
              <div className="compact-past">Deadline passed</div>
            )}
          </div>

          <div className="compact-right">
            <div className="compact-deadline">
              <span className="compact-deadline-label">Deadline:</span>
              <span className="compact-deadline-date">{momentDeadlineDate.format('MMM Do')}</span>
            </div>
            <a
              href={stateData.url}
              target="_blank"
              rel="noopener noreferrer"
              className="compact-button"
            >
              Register →
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="widget-container">
      <div className="widget-header">
        <span className="widget-emoji">{stateData.emoji.substring(0, 2)}</span>
        <h2 className="widget-title">{stateData.label}</h2>
        <span className="widget-emoji">{stateData.emoji.substring(0, 2)}</span>
      </div>

      <div className="widget-election-toggle">
        <button
          className={`toggle-btn ${electionType === 'primary' ? 'active' : ''}`}
          onClick={() => setElectionType('primary')}
        >
          Primary
        </button>
        <button
          className={`toggle-btn ${electionType === 'general' ? 'active' : ''}`}
          onClick={() => setElectionType('general')}
        >
          General
        </button>
      </div>

      {!isPast && daysLeft >= 0 && (
        <div className="widget-days">
          <div className="days-number">{daysLeft}</div>
          <div className="days-label">{daysLeft === 1 ? 'day left' : 'days left'}</div>
        </div>
      )}

      {isPast && (
        <div className="widget-past">
          Registration deadline has passed
        </div>
      )}

      <div className="widget-info">
        <div className="info-row">
          <span className="info-label">Registration Deadline:</span>
          <span className="info-value">{momentDeadlineDate.format('MMM D, YYYY')}</span>
        </div>
        <div className="info-row">
          <span className="info-label">Election Date:</span>
          <span className="info-value">{moment(`${electionDate}T235959`).format('MMM D, YYYY')}</span>
        </div>
      </div>

      <a
        href={stateData.url}
        target="_blank"
        rel="noopener noreferrer"
        className="widget-button"
      >
        Register to Vote →
      </a>

      <div className="widget-footer">
        Powered by <a href="/" target="_blank" rel="noopener noreferrer">Dedline.io</a>
      </div>
    </div>
  );
};

export default Widget;
