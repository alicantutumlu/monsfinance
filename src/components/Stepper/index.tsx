import React from "react";

export const Stepper = ({ steps, activeStep, setActiveStep }: any) => {

    return (
        <div className="myStepper">
            {steps.map((item: any, index: number) => (
                <>
                    <div className="borderContainer">
                        <div className="border">
                            <div className={`inBorder thick20 ${activeStep >= index ? 'primary active' : 'gray'} `} >
                                {index + 1}
                            </div>

                        </div>
                        <div>
                            <h2>
                                Step {index + 1}
                            </h2>
                            <h1>{item.name}</h1>
                            {activeStep > index && (
                                <p className="completed">Completed<span><img src="/icons/tick.svg" alt="" /></span></p>
                            )}

                        </div>

                    </div>

                    {steps.length - 1 !== index && (
                        <div className="lineContainer">
                            {activeStep === index && <img src="/stepper/mid.svg" alt="" />}
                            {activeStep > index && <img src="/stepper/full.svg" alt="" />}
                            {activeStep < index && <img src="/stepper/empty.svg" alt="" />}
                        </div>
                    )}
                </>
            ))}

        </div>
    )

}

export default Stepper