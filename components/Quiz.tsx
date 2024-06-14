"use client";

import React, { useState, ChangeEvent } from "react";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Card } from "@nextui-org/card";
import { Checkbox } from "@nextui-org/checkbox";
import { Services } from "@/config/services"; // Предполагается, что вы импортируете из этого пути

interface Question {
  question: string;
  key: string;
}

const images = [
  { id: "img1", src: "/images/img1.jpg", title: "Image 1" },
  { id: "img2", src: "/images/img2.jpg", title: "Image 2" },
  { id: "img3", src: "/images/img3.jpg", title: "Image 3" },
];

const Quiz: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const questions: Question[] = [
    { question: "What is your name?", key: "name" },
    { question: "What is your age?", key: "age" },
    { question: "What is your favorite color?", key: "color" },
    { question: "Please select an image:", key: "image" },
  ];

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrev = () => {
    setStep(step - 1);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId);
    setAnswers({ ...answers, image: imageId });
  };

  return (
    <Card className="max-w-4xl p-5 mx-auto my-10 shadow-md">
      {step === 0 ? (
        <>
          <h4 className="text-lg font-semibold mb-4">
            Какие услуги вас интересуют?
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2">
            {Services.map((service) => (
              <div key={service.id} className="mb-2">
                <Checkbox
                  value={service.id.toString()}
                  size="md"
                  color="primary"
                >
                  {service.title}
                </Checkbox>
              </div>
            ))}
          </div>
          <div className="flex justify-end mt-4">
            <Button onPress={handleNext}>Next</Button>
          </div>
        </>
      ) : step < questions.length - 1 ? (
        <>
          <h4 className="text-lg font-semibold mb-4">
            {questions[step].question}
          </h4>
          <Input
            isClearable
            variant="underlined"
            fullWidth
            name={questions[step].key}
            onChange={handleChange}
            value={answers[questions[step].key] || ""}
            className="mb-4"
          />
          <div className="flex justify-between">
            {step > 0 && (
              <Button onPress={handlePrev} className="mr-2">
                Previous
              </Button>
            )}
            <Button onPress={handleNext}>
              {step === questions.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </>
      ) : step === questions.length - 1 ? (
        <>
          <h4 className="text-lg font-semibold mb-4">
            Please select an image:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.map((image) => (
              <div
                key={image.id}
                className={`border ${
                  selectedImage === image.id
                    ? "border-blue-500"
                    : "border-gray-300"
                }`}
                onClick={() => handleImageSelect(image.id)}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-auto"
                />
                <p className="text-center">{image.title}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <Button onPress={handlePrev} className="mr-2">
              Previous
            </Button>
            <Button onPress={handleNext} disabled={!selectedImage}>
              Submit
            </Button>
          </div>
        </>
      ) : (
        <h4 className="text-lg font-semibold">
          Thank you for completing the quiz!
        </h4>
      )}
    </Card>
  );
};

export default Quiz;
