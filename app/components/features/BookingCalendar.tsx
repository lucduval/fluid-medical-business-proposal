'use client';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Clock, User, Calendar } from 'lucide-react';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
const times = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '14:00', '14:30', '15:00'];
const doctors = [
  { name: 'Dr Fritz', color: '#5c6340', initials: 'DF' },
  { name: 'Dr Smith', color: '#8a9465', initials: 'DS' },
  { name: 'Dr Jones', color: '#3d4228', initials: 'DJ' },
];

const bookings: Record<string, { doctor: string; service: string; patient: string; color: string }> = {
  'Mon-09:00': { doctor: 'Dr Fritz', service: 'Aesthetics', patient: 'Sarah M.', color: '#5c6340' },
  'Mon-10:30': { doctor: 'Dr Smith', service: 'Health', patient: 'James K.', color: '#8a9465' },
  'Tue-09:00': { doctor: 'Dr Fritz', service: 'Longevity', patient: 'Anna P.', color: '#5c6340' },
  'Tue-11:00': { doctor: 'Dr Jones', service: 'Sport', patient: 'Mike R.', color: '#3d4228' },
  'Wed-09:30': { doctor: 'Dr Smith', service: 'Aesthetics', patient: 'Lisa T.', color: '#8a9465' },
  'Wed-14:00': { doctor: 'Dr Fritz', service: 'Health', patient: 'Chris B.', color: '#5c6340' },
  'Thu-10:00': { doctor: 'Dr Jones', service: 'Longevity', patient: 'Sara L.', color: '#3d4228' },
  'Thu-14:30': { doctor: 'Dr Fritz', service: 'Sport', patient: 'Tom H.', color: '#5c6340' },
  'Fri-09:00': { doctor: 'Dr Smith', service: 'Aesthetics', patient: 'Emma W.', color: '#8a9465' },
  'Fri-11:30': { doctor: 'Dr Jones', service: 'Health', patient: 'David C.', color: '#3d4228' },
};

const serviceColors: Record<string, string> = {
  Aesthetics: '#e8a4b8',
  Health: '#a4c4e8',
  Longevity: '#a4e8c4',
  Sport: '#e8caa4',
};

export default function BookingCalendar() {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [view, setView] = useState<'admin' | 'patient'>('admin');

  const selectedBooking = selectedSlot ? bookings[selectedSlot] : null;

  return (
    <div className="card overflow-hidden" style={{ background: 'white' }}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronLeft size={16} style={{ color: 'var(--muted-foreground)' }} />
          </button>
          <span className="text-sm font-semibold">Week of 16 March 2026</span>
          <button className="p-1 rounded hover:bg-gray-100 transition-colors">
            <ChevronRight size={16} style={{ color: 'var(--muted-foreground)' }} />
          </button>
        </div>
        <div className="flex items-center gap-1 p-1 rounded-lg" style={{ background: 'var(--secondary)' }}>
          <button
            onClick={() => setView('admin')}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: view === 'admin' ? 'var(--color-olive)' : 'transparent',
              color: view === 'admin' ? 'white' : 'var(--muted-foreground)',
            }}
          >
            Admin View
          </button>
          <button
            onClick={() => setView('patient')}
            className="px-3 py-1.5 rounded-md text-xs font-medium transition-all"
            style={{
              background: view === 'patient' ? 'var(--color-olive)' : 'transparent',
              color: view === 'patient' ? 'white' : 'var(--muted-foreground)',
            }}
          >
            Patient Booking
          </button>
        </div>
      </div>

      {view === 'admin' ? (
        <div className="overflow-x-auto">
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 480 }}>
            <thead>
              <tr>
                <th style={{ width: 60, padding: '8px 12px', color: 'var(--muted-foreground)', fontSize: '0.7rem', fontWeight: 600, textAlign: 'left', borderBottom: '1px solid var(--border)' }}></th>
                {days.map(d => (
                  <th key={d} style={{ padding: '8px', color: 'var(--foreground)', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', borderBottom: '1px solid var(--border)' }}>
                    {d}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {times.map((time, ti) => (
                <tr key={time}>
                  <td style={{ padding: '4px 12px', color: 'var(--muted-foreground)', fontSize: '0.65rem', fontWeight: 500, verticalAlign: 'top', borderBottom: ti < times.length - 1 ? '1px solid #f0efeb' : 'none', whiteSpace: 'nowrap' }}>
                    {time}
                  </td>
                  {days.map(day => {
                    const key = `${day}-${time}`;
                    const booking = bookings[key];
                    const isSelected = selectedSlot === key;
                    return (
                      <td
                        key={day}
                        style={{ padding: '3px 4px', borderBottom: ti < times.length - 1 ? '1px solid #f8f7f4' : 'none', verticalAlign: 'top' }}
                      >
                        {booking ? (
                          <button
                            onClick={() => setSelectedSlot(isSelected ? null : key)}
                            className="w-full text-left rounded-md px-2 py-1.5 transition-all"
                            style={{
                              background: isSelected ? booking.color : `${booking.color}20`,
                              border: `1.5px solid ${isSelected ? booking.color : booking.color + '40'}`,
                              transform: isSelected ? 'scale(0.97)' : undefined,
                            }}
                          >
                            <p style={{ fontSize: '0.65rem', fontWeight: 700, color: isSelected ? 'white' : booking.color }}>{booking.doctor}</p>
                            <p style={{ fontSize: '0.6rem', color: isSelected ? 'rgba(255,255,255,0.85)' : booking.color + 'cc' }}>{booking.patient}</p>
                          </button>
                        ) : (
                          <div style={{ height: 36 }} />
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          {/* Legend */}
          <div className="flex items-center gap-4 px-4 py-3" style={{ borderTop: '1px solid var(--border)' }}>
            {doctors.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{d.name}</span>
              </div>
            ))}
            {selectedBooking && (
              <div className="ml-auto flex items-center gap-2 px-3 py-1.5 rounded-lg" style={{ background: 'var(--secondary)' }}>
                <User size={12} style={{ color: 'var(--color-olive)' }} />
                <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>{selectedBooking.patient}</span>
                <span className="phase-badge" style={{ background: serviceColors[selectedBooking.service] + '40', color: '#555', fontSize: '0.6rem' }}>{selectedBooking.service}</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="p-4">
          <p style={{ fontSize: '0.8rem', color: 'var(--muted-foreground)', marginBottom: 12 }}>Book an appointment with Dr Fritz</p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {['Aesthetics', 'Health', 'Longevity', 'Sport'].map(s => (
              <button
                key={s}
                className="flex items-center gap-2 p-3 rounded-xl text-left transition-all hover:scale-[1.02]"
                style={{ border: '1.5px solid var(--border)', background: serviceColors[s] + '20' }}
              >
                <div className="w-3 h-3 rounded-full" style={{ background: serviceColors[s] }} />
                <span style={{ fontSize: '0.8rem', fontWeight: 500 }}>{s}</span>
              </button>
            ))}
          </div>
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12 }}>
            <p style={{ fontSize: '0.75rem', fontWeight: 600, marginBottom: 8 }}>Available slots — Thu 19 March</p>
            <div className="flex flex-wrap gap-2">
              {['09:00', '09:30', '11:00', '14:00', '15:30'].map(t => (
                <button
                  key={t}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                  style={{ border: '1px solid var(--color-olive)', color: 'var(--color-olive)', background: 'transparent' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = 'var(--color-olive)'; (e.target as HTMLElement).style.color = 'white'; }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = 'transparent'; (e.target as HTMLElement).style.color = 'var(--color-olive)'; }}
                >
                  <Clock size={10} className="inline mr-1" />{t}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
