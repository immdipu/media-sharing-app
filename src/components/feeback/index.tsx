import React from "react";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { userApis } from "@/Apis/APIs";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const Feedback = () => {
  const [message, setMessaage] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [name, setName] = React.useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!message) {
      toast({
        title: "Please enter your message",
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    try {
      await userApis.sendFeedback({
        message: message.trim(),
        name: name.trim(),
      });
      setLoading(false);
      setMessaage("");
      setName("");
      toast({
        title: "Feedback sent successfully",
        variant: "default",
      });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <Label htmlFor="issue" className="text-xl text-Paragraph-primary">
            Issue
          </Label>

          <Input
            id="issue"
            className="bg-third-background px-3 py-3 text-Paragraph-primary placeholder:text-neutral-400"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Textarea
            className="resize-none  bg-third-background px-3 py-3 text-Paragraph-primary"
            rows={7}
            placeholder="Explain the issue you are facing"
            value={message}
            onChange={(e) => setMessaage(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          onSubmit={handleSubmit}
          className="mt-8 bg-button-background text-button-primary"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Feedback;
