"use client";
import React from "react";
import Detail from "@/components/list/detail";
const Index: React.FC<{ params: any }> = ({ params }) => {
  const { slug }: { slug: string[] } = React.use(params);
  return <Detail pageId={slug} />;
};

export default Index;
