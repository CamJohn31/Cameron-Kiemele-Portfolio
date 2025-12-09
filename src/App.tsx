import React, { useState, useEffect } from 'react';
import { Mail, Phone, Linkedin, MapPin, ChevronDown, Briefcase, GraduationCap, Award } from 'lucide-react';

function useDecryptText(text: string, speed = 45) {
  const [displayedText, setDisplayedText] = useState("");
  const chars = "!<>-_/[]{}—=+*^?#________";

  useEffect(() => {
    let frame = 0;
    let output = "";
    const queue = text.split("").map((letter, i) => ({
      from: "",
      to: letter,
      start: Math.floor(i * 2 + Math.random() * 8),
      end: Math.floor(i * 2 + Math.random() * 8) + 12
    }));

    let raf: number;
    const update = () => {
      output = "";
      let complete = 0;

      for (let i = 0; i < queue.length; i++) {
        const { from, to, start, end } = queue[i];

        if (frame >= end) {
          complete++;
          output += to;
        } else if (frame >= start) {
          output += chars[Math.floor(Math.random() * chars.length)];
        } else {
          output += from;
        }
      }

      setDisplayedText(output);

      if (complete === queue.length) return;
      frame++;
      raf = window.setTimeout(update, speed);
    };

    update();
    return () => window.clearTimeout(raf);
  }, [text, speed]);

  return displayedText;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('about');
  const [isVisible, setIsVisible] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const decryptedName = useDecryptText("Cameron Kiemele");

  const backgroundImages = [
    "/sports-bg.jpg",
    "/data-bg.jpg",
    "/sustainability-bg.jpg"
  ];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgroundImages.length);
    }, 5000); // change every 5 seconds

    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      {/* Hero Section */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
  {backgroundImages.map((src, i) => (
    <img
      key={i}
      src={src}
      alt=""
      className={`
        absolute inset-0 w-full h-full object-cover transition-opacity duration-[2000ms]
        ${i === bgIndex ? "opacity-40" : "opacity-0"}
      `}
    />
  ))}

  {/* gradient overlay */}
  <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-transparent to-slate-900"></div>
</div>
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 to-transparent"></div>
        <div className={`relative z-10 text-center px-6 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
      <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
        {decryptedName}
      </h1>

          <p className="text-2xl md:text-3xl text-gray-300 mb-6">
            Client Support & Energy Insight Analyst
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <a href="mailto:CameronKiemele@gmail.com" className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-all hover:scale-105">
              <Mail size={18} />
              <span>CameronKiemele@gmail.com</span>
            </a>
            <a href="tel:+447901548344" className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-all hover:scale-105">
              <Phone size={18} />
              <span>+44 7901 548344</span>
            </a>
            <a href="https://www.linkedin.com/in/cameron-kiemele-7aa958290" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-lg transition-all hover:scale-105">
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-gray-400">
            <MapPin size={18} />
            <span>West Kensington, London, England</span>
          </div>
        </div>
        <button 
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce"
        >
          <ChevronDown size={32} className="text-emerald-400" />
        </button>
      </header>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-emerald-500/20">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-8">
            {['about', 'background', 'experience', 'education', 'skills'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`capitalize transition-all ${
                  activeSection === section
                    ? 'text-emerald-400 border-b-2 border-emerald-400'
                    : 'text-gray-400 hover:text-emerald-300'
                }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            About Me
          </h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <p className="text-lg text-gray-300 leading-relaxed">
              Having graduated from the ARBUS program at the University of Waterloo with a focus on Business Management, I bring a dynamic mix of data analytics, client engagement, and sales expertise. In my current role as a Client Support Energy Insight Analyst at En-Pro International, I leverage Excel and data visualization tools to optimize energy strategies for corporate clients.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mt-4">
              Driven by a passion for sustainability, my current role has allowed me to focus on advancing energy efficiency for clients across diverse industries. I am motivated by a passion for translating data into actionable insights, enhancing customer experiences, and supporting efficient and sustainable growth in a competitive business setting.
            </p>
          </div>
        </div>
      </section>

      {/* Background Section */}
      <section id="background" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            My Background
          </h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              {/* Photo */}
              <div className="flex-shrink-0">
                <div className="w-64 h-64 rounded-2xl overflow-hidden border-2 border-emerald-500/30 shadow-lg">
                  <img 
                    src="/Cameron-Kiemele.jpg" 
                    alt="Cameron Kiemele" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Story */}
              <div className="flex-1 space-y-4 text-gray-300 leading-relaxed">
                <h3 className="text-2xl font-semibold text-emerald-400 mb-4">Growing Up</h3>
                <p>
                  I grew up surrounded by high-level sport and a household that sparked my curiosity. As a junior, I competed in elite ice hockey, trained with top-tier international football academies, and played competitive golf across multiple tours. These experiences built the discipline, resilience, and team mindset that shape how I work today.
                </p>
                <p>
                  At the same time, I developed a deep fascination with cars from spending countless hours in the garage watching my grandfather work. Those early moments ignited a lasting interest in how things work and how small improvements can lead to better performance. That curiosity naturally evolved into my professional values: a passion for efficiency, a desire to solve complex problems, and a strong commitment to sustainability and long-term impact.
                </p>
                <p>
                  Whether in sport or in my professional life, I'm motivated by continuous improvement and creating solutions that perform better, last longer, and contribute to a more sustainable future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            Experience
          </h2>
          
          {/* Current Role */}
          <div className="mb-8 bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-emerald-500/20 hover:border-emerald-500/40 transition-all hover:scale-[1.02] transform duration-300">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-emerald-500/20 rounded-lg">
                <Briefcase className="text-emerald-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-semibold text-emerald-400">Client Support Energy Insight Analyst</h3>
                <p className="text-gray-400">En-Pro International Inc. • Oshawa, Ontario, Canada</p>
                <p className="text-sm text-gray-500">August 2024 – Present</p>
              </div>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Analyze large datasets and translate findings into clear, client-ready visual reports and presentations using Excel, PowerPoint, and data visualization tools, supporting strategic decision-making and sustainability goals.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Design and assist in developing visually compelling proposal decks for corporate clients, combining energy usage data, cost forecasts, and rebate insights to communicate savings opportunities and optimization strategies.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Partner with cross-functional teams to develop energy optimization tools and client-facing deliverables. Maintain accurate records of client interactions and energy data, ensuring compliance with regulatory standards.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-emerald-400 mt-1">•</span>
                <span>Collaborated with senior leadership to enhance company-wide performance metrics by identifying data inconsistencies, optimizing and creating efficient workflows, and contributing to the development of an upgraded performance tracking system integrating multiple data sources via KNIME and other data management sources.</span>
              </li>
            </ul>
          </div>

          {/* Previous Roles */}
          <div className="space-y-6">
            <ExperienceCard 
              title="Client Support Data Specialist Intern"
              company="En-Pro International Inc."
              location="Oshawa, Ontario, Canada"
              period="May 2024 – August 2024"
              achievements={[
                "Accurately entered and maintained large datasets on energy consumption, cost modeling, and market pricing, contributing to client presentations on efficiency strategies.",
                "Analyze data and support clients in optimizing their energy strategies, leveraging expertise to provide actionable insights."
              ]}
            />
            
            <ExperienceCard 
              title="F&B (Bartender and Server)"
              company="Bigwin Island Golf Club"
              location="Lake of Bays, Ontario, Canada"
              period="April 2023 - September 2023"
              achievements={[
                "Provided attentive service to high-end clientele, fostering a welcoming atmosphere that enhanced member satisfaction and loyalty",
                "Helped Coordinate and execute luxury weddings and private events, ensuring a seamless guest experience",
                "Assisted with food preparation for intimate events."
              ]}
            />

            <ExperienceCard 
              title="Sales Representative"
              company="Nike"
              location="Niagara-on-the-Lake, Ontario, Canada"
              period="September 2019 – January 2021"
              achievements={[
                "Delivered exceptional customer service by leveraging in-depth product knowledge and passion for sports.",
                "Consistently met and exceeded sales targets while maintaining Nike's brand standards.",
                "Helped customers select ideal products to enhance athletic performance and lifestyle."
              ]}
            />
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            Education
          </h2>
          
          <div className="space-y-6">
            <EducationCard 
              degree="Bachelor's Degree, Business, Management and Liberal Studies"
              institution="University of Waterloo"
              location="Waterloo, Ontario, Canada"
              period="Sep 2021 – Dec 2024"
            />
            
            <EducationCard 
              degree="Bachelor of Business Administration (BBA), Global Business and Digital Arts"
              institution="University of Waterloo"
              location="Waterloo, Ontario, Canada"
              period="Sep 2021 – Dec 2022"
              note="Completed 1.5 Years"
            />
            
            <EducationCard 
              degree="International Baccalaureate (IB), MYP, OSSD Diploma"
              institution="Ridley College"
              location="St. Catharines, Ontario, Canada"
              period="Sep 2018 – May 2021"
            />
          </div>

          {/* Certifications */}
          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-6 flex items-center gap-3">
              <Award className="text-emerald-400" />
              Certifications
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "L1-AP Certified KNIME",
                "Excel Essential Training (Microsoft 3C5)",
                "Smart Serve Certification",
                "Learning SAP Analytics Cloud",
                "Getting Started with Python for Finance"
              ].map((cert, i) => (
                <div key={i} className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-emerald-500/20 hover:border-emerald-500/40 transition-all">
                  <p className="text-gray-300">{cert}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 bg-slate-800/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-3">
            <div className="h-1 w-12 bg-gradient-to-r from-emerald-400 to-teal-400"></div>
            Skills
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <SkillCategory 
              title="Expert"
              skills={["Interpersonal Skills", "Problem Solving", "Customer Service", "Admin Tasks", "Ad-hoc Reporting", "Onboarding Clients"]}
              color="emerald"
            />
            <SkillCategory 
              title="Experienced"
              skills={["Data Analysis", "Microsoft Excel", "Microsoft PowerPoint", "Sales", "Client Support"]}
              color="teal"
            />
            <SkillCategory 
              title="Skillful"
              skills={["Sustainability Reporting", "Research", "Adobe"]}
              color="cyan"
            />
            <SkillCategory 
              title="Developing"
              skills={["Python"]}
              color="sky"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-emerald-500/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gray-400 mb-4">Let's connect and discuss opportunities</p>
          <div className="flex justify-center gap-6">
            <a href="mailto:CameronKiemele@gmail.com" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              <Mail size={24} />
            </a>
            <a href="https://www.linkedin.com/in/cameron-kiemele-7aa958290" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300 transition-colors">
              <Linkedin size={24} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ExperienceCardProps {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

function ExperienceCard({ title, company, location, period, achievements }: ExperienceCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/40 transition-all">
      <h3 className="text-xl font-semibold text-gray-200">{title}</h3>
      <p className="text-gray-400">{company} • {location}</p>
      <p className="text-sm text-gray-500 mb-4">{period}</p>
      <ul className="space-y-2 text-gray-300">
        {achievements.map((achievement, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-emerald-400 mt-1">•</span>
            <span>{achievement}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface EducationCardProps {
  degree: string;
  institution: string;
  location: string;
  period: string;
  note?: string; // OPTIONAL
}

function EducationCard({ degree, institution, location, period, note }: EducationCardProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700 hover:border-emerald-500/40 transition-all flex items-start gap-4">
      <div className="p-3 bg-emerald-500/20 rounded-lg">
        <GraduationCap className="text-emerald-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-xl font-semibold text-gray-200">{degree}</h3>
        {note && <p className="text-sm text-emerald-400">{note}</p>}
        <p className="text-gray-400">{institution}</p>
        <p className="text-sm text-gray-500">{location}</p>
        <p className="text-sm text-gray-500">{period}</p>
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  skills: string[];
  color: "emerald" | "teal" | "cyan" | "sky";
}

function SkillCategory({ title, skills, color }: SkillCategoryProps) {
 const colorClasses: Record<SkillCategoryProps["color"], string> = {
    emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/30',
    teal: 'from-teal-500/20 to-teal-500/5 border-teal-500/30',
    cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
   sky: 'from-sky-500/20 to-sky-500/5 border-sky-500/30',
  };


  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm rounded-2xl p-6 border`}>
      <h3 className="text-xl font-semibold mb-4 text-gray-200">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span key={i} className="px-3 py-1 bg-slate-700/50 rounded-full text-sm text-gray-300">
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}