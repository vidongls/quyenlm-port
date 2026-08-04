import { createFileRoute } from "@tanstack/react-router";
import SelectedWorkPage from "../components/work/SelectedWorkPage";

export const Route = createFileRoute("/work")({ component: SelectedWorkPage });
