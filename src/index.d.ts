import { Component } from 'aframe';

export type AframeComponent<T> = T & Partial<Component> & ThisType<T & Component>
