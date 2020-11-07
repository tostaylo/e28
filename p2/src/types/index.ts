export interface TimingResult {
	timing_framework: string;
	timing_type: string;
	final_timing: { total_dur: number; click_dur: number; render_during_click: number; render_after_click: number };
}
