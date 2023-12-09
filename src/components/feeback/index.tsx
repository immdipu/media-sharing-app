import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const Feedback = () => {
  return (
    <div>
      <div className="flex flex-col gap-4">
        <Label htmlFor="issue" className="text-xl text-Paragraph-primary">
          Issue
        </Label>
        <Textarea
          className="resize-none  bg-third-background px-3 py-3 text-Paragraph-primary"
          rows={7}
          placeholder="Explain the issue you are facing"
        />
      </div>
      <Button className="mt-8 bg-button-background text-button-primary">
        Submit
      </Button>
    </div>
  );
};

export default Feedback;
