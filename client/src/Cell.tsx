/**
 * A Cell is a grid-positioned container. It uses a flex layout internally, to center
 * its children.
 */
import React from 'react';
import styled from 'styled-components';
import { BoardPosition } from '@seis/core';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  position: BoardPosition
}

const variants = {
  C00: { top: " 5.0%", left: "57.5%" },
  C01: { top: "12.5%", left: "57.5%" },
  C02: { top: "20.0%", left: "57.5%" },
  C03: { top: "27.5%", left: "57.5%" },
  C04: { top: "35.0%", left: "57.5%" },
  C05: { top: "42.5%", left: "57.5%" },

  C06: { top: "42.5%", left: "65.0%" },
  C07: { top: "42.5%", left: "72.5%" },
  C08: { top: "42.5%", left: "80.0%" },
  C09: { top: "42.5%", left: "87.5%" },
  C0A: { top: "42.5%", left: "95.0%" },
  C0B: { top: "50.0%", left: "95.0%" },

  C10: { top: "57.5%", left: "95.0%" },
  C11: { top: "57.5%", left: "87.5%" },
  C12: { top: "57.5%", left: "80.0%" },
  C13: { top: "57.5%", left: "72.5%" },
  C14: { top: "57.5%", left: "65.0%" },
  C15: { top: "57.5%", left: "57.5%" },

  C16: { top: "65.0%", left: "57.5%" },
  C17: { top: "72.5%", left: "57.5%" },
  C18: { top: "80.0%", left: "57.5%" },
  C19: { top: "87.5%", left: "57.5%" },
  C1A: { top: "95.0%", left: "57.5%" },
  C1B: { top: "95.0%", left: "50.0%" },

  C20: { top: "95.0%", left: "42.5%" },
  C21: { top: "87.5%", left: "42.5%" },
  C22: { top: "80.0%", left: "42.5%" },
  C23: { top: "72.5%", left: "42.5%" },
  C24: { top: "65.0%", left: "42.5%" },
  C25: { top: "57.5%", left: "42.5%" },

  C26: { top: "57.5%", left: "35.0%" },
  C27: { top: "57.5%", left: "27.5%" },
  C28: { top: "57.5%", left: "20.0%" },
  C29: { top: "57.5%", left: "12.5%" },
  C2A: { top: "57.5%", left: " 5.0%" },
  C2B: { top: "50.0%", left: " 5.0%" },

  C30: { top: "42.5%", left: " 5.0%" },
  C31: { top: "42.5%", left: "12.5%" },
  C32: { top: "42.5%", left: "20.0%" },
  C33: { top: "42.5%", left: "27.5%" },
  C34: { top: "42.5%", left: "35.0%" },
  C35: { top: "42.5%", left: "42.5%" },

  C36: { top: "35.0%", left: "42.5%" },
  C37: { top: "27.5%", left: "42.5%" },
  C38: { top: "20.0%", left: "42.5%" },
  C39: { top: "12.5%", left: "42.5%" },
  C3A: { top: " 5.0%", left: "42.5%" },
  C3B: { top: " 5.0%", left: "50.0%" },

  H00: { top: "12.5%", left: "50.0%" },
  H01: { top: "20.0%", left: "50.0%" },
  H02: { top: "27.5%", left: "50.0%" },
  H03: { top: "35.0%", left: "50.0%" },

  H10: { top: "50.0%", left: "87.5%" },
  H11: { top: "50.0%", left: "80.0%" },
  H12: { top: "50.0%", left: "72.5%" },
  H13: { top: "50.0%", left: "65.0%" },

  H20: { top: "87.5%", left: "50.0%" },
  H21: { top: "80.0%", left: "50.0%" },
  H22: { top: "72.5%", left: "50.0%" },
  H23: { top: "65.0%", left: "50.0%" },

  H30: { top: "50.0%", left: "12.5%" },
  H31: { top: "50.0%", left: "20.0%" },
  H32: { top: "50.0%", left: "27.5%" },
  H33: { top: "50.0%", left: "35.0%" },

  S00: { top: " 5.0%", left: "80.0%" },
  S01: { top: "10.0%", left: "85.0%" },
  S02: { top: "15.0%", left: "90.0%" },
  S03: { top: "20.0%", left: "95.0%" },

  S10: { top: "80.0%", left: "95.0%" },
  S11: { top: "85.0%", left: "90.0%" },
  S12: { top: "90.0%", left: "85.0%" },
  S13: { top: "95.0%", left: "80.0%" },

  S20: { top: "95.0%", left: "20.0%" },
  S21: { top: "90.0%", left: "15.0%" },
  S22: { top: "85.0%", left: "10.0%" },
  S23: { top: "80.0%", left: " 5.0%" },

  S30: { top: "20.0%", left: " 5.0%" },
  S31: { top: "15.0%", left: "10.0%" },
  S32: { top: "10.0%", left: "15.0%" },
  S33: { top: " 5.0%", left: "20.0%" },
};

const Cell = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: ${({ position }) => variants[position].top};
  left: ${({ position }) => variants[position].left};
  width: 7.5%;
  height: 7.5%;
  margin-top: -3.75%;
  margin-left: -3.75%;

  transition:
    top 500ms ease-out,
    left 500ms ease-out;
`;

export default Cell;
