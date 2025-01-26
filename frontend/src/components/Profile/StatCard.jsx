import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const StatCard = ({ title, value }) => (
  <Card>
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold">{value}</p>
    </CardContent>
  </Card>
)

export default StatCard

