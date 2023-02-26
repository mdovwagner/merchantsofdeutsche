import { render, screen } from '@testing-library/react';
import App from './App';
import { jsx as _jsx } from "react/jsx-runtime";
test('renders learn react link', () => {
  render( /*#__PURE__*/_jsx(App, {}));
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});