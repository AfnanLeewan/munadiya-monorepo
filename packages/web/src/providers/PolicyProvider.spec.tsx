import { vi, test, describe, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import { PolicyProvider, PolicyProviderContext } from './PolicyProvider'

describe('PolicyProvider', () => {
  test('renders children when authorized and not loading', () => {
    vi.mock('@/hooks/useAuth', () => ({
      useAuth: () => ({
        loggedIn: true,
        currentUser: null,
        roles: ['testRole'],
        currentRole: 'testRole',
        isStudent: false,
        isTeacher: false,
        isAdmin: false,
        teacherId: '',
        setTeacherIdValue: () => {},
        hasRoles: () => true,
        signInWithEmail: async () => {},
        signInWithGoogle: async () => {},
        signOut: async () => {},
        resetPassword: async () => {},
        changePassword: async () => {},
        verifyPassword: async () => {},
        verifyPasswordResetCode: async () => {},
        confirmPasswordReset: async () => {},
      }),
    }))

    vi.mock('@/hooks/useAPI', () => ({
      useGetAPI: () => ({
        data: {
          policies: [
            {
              method: 'VIEW',
              resources: ['/test'],
            },
          ],
        },
        isLoading: false,
        isFetching: false,
      }),
    }))

    const mockPolicies = [
      {
        method: 'VIEW',
        resources: ['/test'],
      },
    ]

    render(
      <Router>
        <PolicyProviderContext.Provider
          value={{
            isLoading: false,
            policies: mockPolicies,
            allowToAccessToLocation: () => true,
          }}
        >
          <PolicyProvider>
            <div>Test Child</div>
          </PolicyProvider>
        </PolicyProviderContext.Provider>
      </Router>,
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})
