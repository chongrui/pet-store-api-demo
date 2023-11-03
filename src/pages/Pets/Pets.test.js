import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import Pets from './Pets';
import makeServer from '../../utilities/mocks/mockServer';
import seedMockData from '../../utilities/mocks/mockData';

describe('test the pets page', () => {
  let server;

  beforeEach(() => {
    server = makeServer({ environment: "test" });
  });

  afterEach(() => {
    server.shutdown();
  });

  test('should render pet status filter correctly', async () => {
    const user = userEvent.setup();
    render(<BrowserRouter><Pets /></BrowserRouter>);

    const button = screen.getByRole('combobox');
    expect(button).toBeInTheDocument();

    await act(async () => {
      await user.click(button);
    });
    await waitFor(() => expect(screen.getByText('Available')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Pending')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('Sold')).toBeInTheDocument());
  });

  test('should render pet inventory list correctly', async () => {
    seedMockData(server);

    const { getByText } = render(<BrowserRouter><Pets /></BrowserRouter>);

    expect(getByText('Pet Inventory')).toBeInTheDocument();
    await waitFor(() => {
      expect(getByText('Cat 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Cat 2')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Cat 3')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Dog 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Dog 2')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Dog 3')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Lion 1')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Lion 2')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Lion 3')).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(getByText('Rabbit 1')).toBeInTheDocument();
    });
  });

});