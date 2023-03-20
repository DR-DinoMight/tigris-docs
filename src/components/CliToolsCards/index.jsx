import React from "react";
import {
  HomepageCard as Card,
  HomepageSection as Section,
} from "../HomepageComponents";
import { TerminalIcon } from "../../icons";

export default function CliToolsCards() {
  return (
    <Section title="Tools">
      <Card
        title="Tigris CLI"
        description="A command line tool to get things done quick"
        to="/docs/sdkstools/cli/"
        icon={<TerminalIcon />}
      />
      <Card
        title="Create Tigris App"
        description="The easiest way to get started in TypeScript"
        to="/docs/sdkstools/create-tigris-app/"
        icon={<TerminalIcon />}
      />
    </Section>
  );
}
