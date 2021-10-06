import React from 'react';
import PropTypes from 'prop-types';

const StepCounter = ({ ...props }) => {
  const { totalSteps, activeStepNumber } = props;

  return (
    <ul className='step-counter list'>
      {[...Array(totalSteps).keys()].map((ele, idx) => {
        const counterBoxCompleted =
          idx + 1 < activeStepNumber ? 'counter__box--completed' : '';
        const counterBoxActive =
          idx + 1 === activeStepNumber ? 'counter__box--active' : '';
        const counterBarCompleted =
          idx + 1 < activeStepNumber ? 'counter__box--completed' : '';

        return (
          <React.Fragment key={ele}>
            <li
              className={`counter__box ${counterBoxCompleted} ${counterBoxActive}`}
            >
              {idx + 1}
            </li>
            <span className={`counter__bar ${counterBarCompleted}`} />
          </React.Fragment>
        );
      })}
    </ul>
  );
};

StepCounter.defaultProps = {
  totalSteps: 2,
  activeStepNumber: 1,
};

StepCounter.propTypes = {
  totalSteps: PropTypes.number,
  activeStepNumber: PropTypes.number,
};

export default StepCounter;
