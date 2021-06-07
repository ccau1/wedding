class Logger {
  enable: boolean;
  context: string;
  subContext: string;
  priority: number;

  constructor(options?: {
    enable?: boolean;
    context?: string;
    subContext?: string;
    priority?: number;
  }) {
    const opts = {
      enable: true,
      priority: 0,
      ...options,
    };
    this.enable = opts.enable;
    this.context = opts.context;
    this.subContext = opts.subContext;
    this.priority = opts.priority;
  }

  log(...parts) {
    // if log not enabled, do not log anything
    if (!this.enable) return;
    const options: {
      level?: number;
      color?: string;
      background?: string;
      context?: string;
      subContext?: string;
    } = {
      color: "#bada55",
      background: "#222",
      level: 0,
      context: this.context,
      subContext: this.subContext,
      ...(parts.length > 1 ? parts.pop() : {}),
    };
    // if this log's priority is lower than the defined priority, don't show
    if (options.level < this.priority) return;
    // do something with options
    console.info(
      `%c${options.context ? `${options.context}` : ""}${
        options.context && options.subContext ? "::" : ""
      }${options.subContext ? `[${options.subContext}]` : ""} -`,
      `background: ${options.background}; color: ${options.color}`,
      ...parts
    );
  }

  _logWithOpts(parts, opts) {
    // set options to pass down to this.log
    const partsDown =
      parts.length > 1
        ? [
            ...parts.slice(0, parts.length - 2),
            {
              ...opts,
              ...parts[parts.length - 1],
            },
          ]
        : [...parts, opts];
    // call base log fn
    this.log(...partsDown);
  }

  warn(...parts) {
    this._logWithOpts(parts, {
      color: "#ffc107",
    });
  }

  error(...parts) {
    this._logWithOpts(parts, {
      color: "#dc3545",
    });
  }

  info(...parts) {
    this._logWithOpts(parts, {
      color: "#17a2b8",
    });
  }

  success(...parts) {
    this._logWithOpts(parts, {
      color: "#28a745",
    });
  }
}

export default Logger;
