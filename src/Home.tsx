import { useState } from 'react';
import OpenAI from 'openai';
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

const OutreachForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    role: '',
    email: '',
    goal: '',
    subject: '',
    tone: 'professional',
    length: 'medium',
    language: 'English',
    intent: ''
  });

  const [emailGenerated, setEmailGenerated]: any = useState('Email drafting box');

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    console.log("called");
    e.preventDefault();

    const prompt = `Generate a ${formData.tone} ${formData.length} outreach email in ${formData.language} with the following details:
    
    Recipient: ${formData.firstName} ${formData.lastName}
    Company: ${formData.company}
    Role: ${formData.role}
    Email: ${formData.email}
    Goal: ${formData.goal}
    Subject: ${formData.subject}
    Intent: ${formData.intent}
    
    Please create an appropriate email that matches the specified tone and length.`;

    const response = await client.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are an AI email generator." },
        { role: "user", content: prompt },
      ]
    });

    setEmailGenerated(response.choices[0].message.content);


    console.log('OpenAI Prompt:', prompt);
    console.log('Form Data:', formData);
    console.log(response.choices[0].message.content)
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 flex justify-between flex-row gap-3">
      <div className="max-w-md">
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-slate-900 mb-2">
              Outreach Generator
            </h1>
            <p className="text-slate-600">
              Create personalized outreach emails in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2">
                Recipient Details
              </h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Email Content */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2">
                Email Content
              </h2>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Goal of Outreach
                </label>
                <input
                  type="text"
                  name="goal"
                  value={formData.goal}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  placeholder="e.g., Schedule a meeting, Partnership inquiry"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Email Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">
                  Your Intent
                </label>
                <p className="text-xs text-slate-500 mb-1">
                  {300 - formData.intent.length} characters remaining
                </p>
                <textarea
                  name="intent"
                  value={formData.intent}
                  onChange={handleInputChange}
                  maxLength={300}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent resize-none"
                  placeholder="Describe your specific intent or message..."
                  required
                />
              </div>
            </div>

            {/* Settings */}
            <div className="space-y-4">
              <h2 className="text-lg font-medium text-slate-900 border-b border-slate-200 pb-2">
                Email Settings
              </h2>

              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">
                    Tone
                  </label>
                  <select
                    name="tone"
                    value={formData.tone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                  >
                    <option value="friendly">Friendly</option>
                    <option value="professional">Professional</option>
                    <option value="formal">Formal</option>
                    <option value="casual">Casual</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Length
                    </label>
                    <select
                      name="length"
                      value={formData.length}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    >
                      <option value="short">Short</option>
                      <option value="medium">Medium</option>
                      <option value="long">Long</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">
                      Language
                    </label>
                    <select
                      name="language"
                      value={formData.language}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:border-transparent"
                    >
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-slate-900 text-white py-2.5 px-4 rounded-md hover:bg-slate-800 transition-colors font-medium text-sm focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2"
            >
              Generate Email
            </button>
          </form>
        </div>
      </div>
      {/* Email Draft */}
      <div className='w-full border rounded-lg'>
        <p>Email Draft</p>
        <p>{emailGenerated}</p>
      </div>
    </div>
  );
};

export default OutreachForm;
