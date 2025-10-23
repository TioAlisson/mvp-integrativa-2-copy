import IntegrationCard from "./IntegrationCard";
import LogoNotion from "../../../../public/logo-notion.png";
import LogoSlack from "../../../../public/logo-slack.png";
import LogoTrello from "../../../../public/logo-trello.png";

export default function IntegrationCardInfo() {
  const cards = [
    {
      logo: LogoNotion,
      companyName: "Notion",
      jobTitle: "Senior UI/UX Designer",
      tags: ["Part-Time"],
      level: "Senior Level",
      price: "$Free",
      isConnected: true,
      applyUrl: "#",
    },
    {
      logo: LogoSlack,
      companyName: "Slack",
      jobTitle: "Frontend Developer",
      tags: ["Full-Time"],
      level: "Mid Level",
      price: "$29",
      isConnected: false,
      applyUrl: "#",
    },
    {
      logo: LogoTrello,
      companyName: "Figma",
      jobTitle: "Product Designer",
      tags: ["Remote"],
      level: "Senior Level",
      price: "$99",
      isConnected: false,
      applyUrl: "#",
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
      {cards.map((card, index) => (
        <IntegrationCard key={index} {...card} />
      ))}
    </div>
  );
}
