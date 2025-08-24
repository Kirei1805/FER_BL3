import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  SlideIn,
  PopIn,
  FloatingElement,
  SpotlightCard,
  GradientText,
  BreathingElement,
} from "./AnimationComponents";
import "./Animations.css";

const StatCard = ({ title, value, icon }) => (
  <SpotlightCard>
    <div className="stat-card">
      <PopIn>
        <div className="stat-icon">{icon}</div>
        <GradientText>
          <h3 className="stat-value">{value}</h3>
        </GradientText>
        <p className="stat-title">{title}</p>
      </PopIn>
    </div>
  </SpotlightCard>
);

const Stats = ({ stats }) => {
  return (
    <Container className="my-5">
      <Row>
        <Col md={3} sm={6} className="mb-4">
          <SlideIn direction="left">
            <StatCard title="Products" value={stats.products} icon="🎵" />
          </SlideIn>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <SlideIn direction="left">
            <StatCard title="Brands" value={stats.brands} icon="🎸" />
          </SlideIn>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <SlideIn direction="right">
            <StatCard title="Categories" value={stats.categories} icon="🎹" />
          </SlideIn>
        </Col>
        <Col md={3} sm={6} className="mb-4">
          <SlideIn direction="right">
            <StatCard title="Orders" value={stats.orders} icon="🛒" />
          </SlideIn>
        </Col>
      </Row>
    </Container>
  );
};

export default Stats;
