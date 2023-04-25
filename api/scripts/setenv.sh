#!/usr/bin/env bash

export $(grep -v '^#' .integration.env | xargs)
